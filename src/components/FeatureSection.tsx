const FeatureSection = ({ title, text, image, reverse = false }) => {
  return (
    <div
      className={`relative mt-24 flex flex-col ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } items-center justify-center md:h-[550px]`}
    >
      <div className="w-full md:flex-1 flex justify-center items-center">
        <img
          src={image}
          alt={title}
          className="w-full h-64 md:h-96 object-contain mb-6"
        />
      </div>
      <div className="w-full md:flex-1 flex flex-col justify-center px-6 md:px-10 max-w-md md:max-w-none">
        <h2 className="text-2xl md:text-3xl mb-6 font-bold text-space-purple">
          {title}
        </h2>
        <p className="text-lg text-white/80">{text}</p>
      </div>
    </div>
  );
};

export default FeatureSection;
