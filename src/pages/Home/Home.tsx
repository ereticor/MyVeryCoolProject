import AppCard from "components/AppCard";

import { IAppList } from "interfaces/app";

import "./Home.scss";

const Home = ({ appList }: { appList: IAppList }) => {
  return (
    <div className="app__list">
      {appList.map((item) => {
        return (
          <AppCard key={`app: ${item.name}`} app={item} className="app__card" />
        );
      })}
    </div>
  );
};

export default Home;
