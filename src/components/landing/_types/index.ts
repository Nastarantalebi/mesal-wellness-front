export type TLandingData = {
  capabilities: {
    name: string;
    data: {
      src: string;
      title: string;
      description: string;
    }[];
  };
//   features: {
//     name: string;
//     data: {
//       src: string;
//       title: string;
//       description: string;
//     }[];
//   };
  about: {
    name: string;
    data: {
      title: string;
      description: string;
    }[]
  }
};
