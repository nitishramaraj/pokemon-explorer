import React from "react";
import ContentLoader from "react-content-loader";

const SkeletonCard = () => (
  <div className="relative max-w-l w-full p-4 bg-gray-200 rounded-lg shadow-lg">
    <ContentLoader
      speed={2}
      width={150}
      height={200}
      viewBox="0 0 150 200"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="75" cy="60" r="50" />

      <rect x="20" y="130" rx="5" ry="5" width="110" height="15" />

      <rect x="40" y="160" rx="5" ry="5" width="70" height="10" />
      <rect x="40" y="180" rx="5" ry="5" width="70" height="10" />
    </ContentLoader>
  </div>
);

export default SkeletonCard;
