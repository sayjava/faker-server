// deno-lint-ignore-file no-explicit-any
import {
  ArgumentNode,
  DirectiveNode,
  GraphQLResolveInfo,
  SelectionNode,
} from "../deps.ts";

const argumentToObject = (
  argumentNode: any,
  variables: { [key: string]: any },
): any => {
  if (argumentNode.kind === "ObjectValue") {
    const obj: { [key: string]: any } = {};
    argumentNode.fields.forEach((field: any) => {
      obj[field.name.value] = argumentToObject(field.value, variables);
    });
    return obj;
  } else if (argumentNode.kind === "ListValue") {
    return argumentNode.values.map((valueNode: any) =>
      argumentToObject(valueNode, variables)
    );
  } else if (argumentNode.kind === "Variable") {
    return variables[argumentNode.name.value];
  } else if (argumentNode.kind === "IntValue") {
    return parseInt(argumentNode.value, 10);
  } else if (argumentNode.kind === "FloatValue") {
    return parseFloat(argumentNode.value);
  } else if (argumentNode.kind === "Argument") {
    return argumentToObject(argumentNode.value, variables);
  } else {
    return argumentNode.value;
  }
};

const convertArgumentsToObj = (
  argumentsNode: Readonly<ArgumentNode[]>,
  variables: { [key: string]: any },
): { [key: string]: any } => {
  const argsObj: { [key: string]: any } = {};

  argumentsNode.forEach((arg) => {
    argsObj[arg.name.value] = argumentToObject(arg.value, variables);
  });

  return argsObj;
};

const convertDirectiveNodeToObj = (
  directiveNode: Readonly<DirectiveNode>,
  variables: { [key: string]: any },
): { [key: string]: any } => {
  const directiveObj: { [key: string]: any } = {};

  if (directiveNode.arguments != null) {
    directiveNode.arguments.forEach((arg) => {
      directiveObj[arg.name.value] = argumentToObject(arg, variables);
    });
  }

  return directiveObj;
};

export const convertDirectivesToObj = (
  directives: Readonly<DirectiveNode[]>,
  variables: { [key: string]: any },
): { [key: string]: any } => {
  const directiveObj: { [key: string]: any } = {};

  directives.forEach((directive) => {
    directiveObj[directive.name.value] = convertDirectiveNodeToObj(
      directive,
      variables,
    );
  });
  return directiveObj;
};

export const resolveInfoToTree = (
  resolveInfo: GraphQLResolveInfo,
  variables: { [key: string]: any },
): {
  [key: string]: any;
} => {
  const fieldNodes = resolveInfo.fieldNodes[0]?.selectionSet?.selections ?? [];

  function traverseFields(nodes: Readonly<SelectionNode[]>): {
    [key: string]: any;
  } {
    const tree: { [key: string]: any } = {};

    nodes.forEach((node: SelectionNode) => {
      if (node.kind === "Field") {
        const fieldName = node.name.value;
        tree[fieldName] = {
          __args: {},
          __directives: {},
        };

        tree[fieldName].__directives = convertDirectivesToObj(
          node.directives ?? [],
          variables,
        );
        tree[fieldName].__args = convertArgumentsToObj(
          node.arguments ?? [],
          variables,
        );

        if (node.selectionSet != null) {
          tree[fieldName] = Object.assign(
            tree[fieldName],
            traverseFields(node.selectionSet.selections),
          );
        }
      }

      if (node.kind === "FragmentSpread") {
        const fragmentName = node.name.value;
        const fragmentDefinition = resolveInfo.fragments[fragmentName];
        const fragmentFields = fragmentDefinition.selectionSet.selections;
        Object.assign(tree, traverseFields(fragmentFields));
      }
    });

    return tree;
  }

  return traverseFields(fieldNodes);
};
