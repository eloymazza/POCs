import { useEffect } from "react";

const Main = () => {
  useEffect(() => {
    const getFromUrl = async () => {
      const response = await fetch("https://randomuser.me/api/");
      const data = await response.json();
    };
    getFromUrl();
  }, []);
  return <div>Main</div>;
};

export default Main;
