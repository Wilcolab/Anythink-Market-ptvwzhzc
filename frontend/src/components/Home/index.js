import Banner from "./Banner";
import MainView from "./MainView";
import React, { useEffect, useState } from "react";
import Tags from "./Tags";
import agent from "../../agent";
import { connect } from "react-redux";
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER,
} from "../../constants/actionTypes";

const Promise = global.Promise;

const mapStateToProps = (state) => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
});

const mapDispatchToProps = (dispatch) => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (tab, pager, payload) =>
    dispatch({ type: HOME_PAGE_LOADED, tab, pager, payload }),
  onUnload: () => dispatch({ type: HOME_PAGE_UNLOADED }),
});

const Home = ({onLoad, onUnload, tags, onClickTag}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const tab = "all";
  const itemsPromise = agent.Items.all;

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    onLoad(
      tab,
      itemsPromise,
      Promise.all([agent.Tags.getAll(), itemsPromise()])
    );
    return onUnload;
  }, [onLoad, onUnload, tab, itemsPromise]);

    return (
      <div className="home-page">
        <Banner onSearch={handleSearch}/>

        <div className="container page">
          <Tags tags={tags} onClickTag={onClickTag} />
          <MainView searchTerm={searchTerm} />
        </div>
      </div>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);