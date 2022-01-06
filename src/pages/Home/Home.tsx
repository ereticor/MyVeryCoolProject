import AppCard from "components/AppCard";

import { IAppList } from "interfaces/app";

import "./Home.sass";

const Home = ({ appList }: { appList: IAppList }) => {
  return (
    <div className="app__list">
      {appList.map((item, index) => {
        return (
          <AppCard key={`app: ${index}`} app={item} className="app__card" />
        );
      })}
    </div>
  );
};

export default Home;
