const html = (desc) => {
  return { __html: desc };
};

export const Feature = ({ feature }) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        <div>
          <feature.icon />
        </div>
        <h4 className="font-bold">{feature.title}</h4>
      </div>
      <p dangerouslySetInnerHTML={html(feature.description)}></p>
    </div>
  );
};
