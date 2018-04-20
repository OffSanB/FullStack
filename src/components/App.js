import React from 'react';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import * as api from '../api'

const pushState=(obj,url) => 
    window.history.pushState(obj,'',url);

const onPopState = handler => {
    window.onpopstate=handler;
}

class App extends React.Component {
    static propTypes =  {
        initialData:React.PropTypes.object.isRequired
    };
  state =this.props.initialData;
  pageHeader() {
      if(this.state.currentContestId){
        return this.currentContest().contestName;
      }
      return 'Naming Contests';
  };

  componentDidMount() {
    onPopState((event)=>{
        this.setState({
            currentContestId:(event.state || {}).currentContestId
        });
    });

  }
  componentWillUnmount() {
    onPopState(null);
  }
  fetchContest = (contestId) => {
       pushState(
          {currentContestId: contestId },
          ('/contest/'+contestId)
      );
api.fetchContest(contestId).then(contest =>{
    this.setState({
        currentContestId: contest._id,
        contests: {
            ...this.state.contests,
            [contest._id]: contest
        }
    });
});
};

fetchContestList = () => {
    pushState(
       {currentContestId: null },
       '/'
   );
api.fetchContestList().then(contests =>{
 this.setState({
     currentContestId: null,
     contests
 });
});
};


fetchNames = (nameIds) => {
    if (nameIds.length === 0) {
        console.log("nameID length is zero");
        return;

    }
    api.fetchNames(nameIds).then(names=>{
        console.log(names);
        this.setState({
            names
        });
    });
};


  currentContest() {
      return this.state.contests[this.state.currentContestId];
  }
  lookupName = (nameId) => {
      if (!this.state.names || !this.state.names[nameId]){
          return {
              name: '...'
      };
    }
      return this.state.names[nameId];
  
};
addName=(newName, contestId) => {
    if(!newName){
        return;
    }
    console.log(newName+"--newName,contestId---"+contestId);
   api.addName(newName, contestId).then(resp =>{
    console.log(resp);
            this.setState({
                contests:{
                    ...this.state.contests,
                    [resp.updatedContest._id]: resp.updatedContest
                },
                names:{
                    ...this.state.names,
                    [resp.newName._id]:resp.newName
                }
            });
   })
         .catch(console.error); //api
};
  currentContent() {
      if(this.state.currentContestId){
           return <Contest
           contestListClick={this.fetchContestList}
           fetchNames={this.fetchNames}
           lookupName={this.lookupName}
           addName={this.addName}
           {...this.currentContest()} />;
      }
       return  <ContestList 
            onContestClick={this.fetchContest}
            contests={this.state.contests} />;
  }
  //lookup the contest
 
  render() {
          return (
      <div className="App">
        <Header message={this.pageHeader()} />
        {this.currentContent()}
     </div>
     
    );
}
}


export default App;