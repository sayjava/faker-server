import { GraphQLSchema, ServerContext, GraphQLResolveInfo, Handlebars } from '../deps.ts'
import { convertDirectivesToObj, resolveInfoToTree } from './utils.ts'

interface CreateResolverArgs {
    schema: GraphQLSchema,
    templateDir: string
}

const registerPartial = (file: Deno.DirEntry, templateDir: string) => {
    if (file.name.endsWith('.hbs') && file.name.startsWith('_')) {
        const partialName = file.name.split('.')[0].replace('_', '')
        const partialContent = Deno.readTextFileSync([templateDir, file.name].join('/'))
        Handlebars.registerPartial(partialName, partialContent)
    }
}

const registerPartials = (templateDir: string) => {
    const partials = Deno.readDirSync(templateDir)
    for (const partial of partials) {
        if (partial.isFile) {
            registerPartial(partial, templateDir)
        } else {
            registerPartials([templateDir, partial.name].join('/'))
        }
    }
}

const watchPartials = async (templateDir: string) => {
    const watcher = Deno.watchFs(templateDir)
    for await (const event of watcher) {
        if (event.kind === 'create' || event.kind === 'modify') {
            event.paths.forEach(path => {
                const [file] = path.match('_.*\.hbs') ?? []
                if (file) {
                    const partialName = file.split('.')[0].replace('_', '')
                    const partialContent = Deno.readTextFileSync(path)
                    Handlebars.registerPartial(partialName, partialContent)
                    console.info(`graphql: [partial updated] ${partialName}`)
                }
            })
        }
    }
}

const makeResolvers = (fields: { [key: string]: any }, templateDir: string): { [key: string]: any } => {
    const operations: { [key: string]: any } = {}

    for (const fieldName in fields) {

        const resolver = (_: any, params: { [key: string]: any }, ctx: ServerContext, resolveInfo: GraphQLResolveInfo) => {
            console.info(`graphql: [received operation] ${fieldName}`)

            const directives = convertDirectivesToObj(resolveInfo.operation.directives ?? [], ctx.variables)
            const extraParams = { __args: params, __directives: directives }


            const tree = { [fieldName]: { ...extraParams, ...resolveInfoToTree(resolveInfo, ctx.variables) } }
            const template = Deno.readTextFileSync([templateDir, `${fieldName}.hbs`].join('/'))
            const compileFunc = Handlebars.compile(template, { compat: true, preventIndent: false })

            const content = compileFunc({ tree, ...ctx })
            return JSON.parse(content)
        }


        operations[fieldName] = resolver
    }

    return operations
}

export const createResolvers = (arg: CreateResolverArgs): { [key: string]: any } => {
    const { schema, templateDir } = arg
    const resolvers: { [key: string]: any } = {}
    const queryType = schema.getQueryType()
    const mutationType = schema.getMutationType()

    if (queryType != null) {
        resolvers[queryType.name] = makeResolvers(queryType.getFields(), templateDir)
    }

    if (mutationType != null) {
        resolvers[mutationType.name] = makeResolvers(mutationType.getFields(), templateDir)
    }

    watchPartials(templateDir)
    registerPartials(templateDir)
    return resolvers
}