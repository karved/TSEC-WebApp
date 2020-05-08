import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import ChatList from "./components/ChatList";
import Conversation from "./components/Conversation";
import Convo from "./components/Convo";
import Landing from "./components/Landing";
import CreateNotice from "./components/CreateNotice";
import PageNotFound from "./components/PageNotFound";
import Landings from "./components/landings";
import StudNot from "./components/StudNot";
import Student from "./components/Student";
import TeachNot from "./components/TeachNot";
import Teacher from "./components/Teacher";
import CreateCommitteeNotice from "./components/Committee/CreateCommitteeNotice";
import CommitteeNotices from "./components/Committee/CommitteeNotices";
import CreateOfficeNotice from "./components/Office/CreateOfficeNotice";
import OfficeNoticeList from "./components/Office/OfficeNoticeList";
import CommitteeNoticeVerify from "./components/MadClub/CommitteeNoticeVerify";
import Members from "./components/home/members";
import Notices from "./components/Notices";
import Library from "./components/Library/Library";
import Forgotpass from "./components/SignIn/Forgotpass";
function App() {
  // const messaging = firebase.messaging();
  // var topic="test-"+"Notification";

  // messaging.requestPermission()
  // .then(function(){
  //     console.log("Success")
  //     return messaging.getToken();
  // })
  // .then(function(token){
  //   firebase.functions()
  //   .httpsCallable('testSubscribeToTopic')({ token, topic })
  //   .then(console.log)
  //   .catch(console.error);
  // })
  // .catch(function(err){
  //     console.log("Fail");
  // })

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landings} />
        <Route path="/forgotpass" component={Forgotpass} />
        <Route path="/landing" component={Landing} />
        <Route path="/signin" component={SignIn}></Route>
        <Route path="/notices" component={Notices}></Route>
        <Route path="/notifications" component={StudNot} />
        <Route path="/notifications1" component={TeachNot} />
        <Route path="/stnotifications" component={Student} />
        <Route path="/tcnotifications" component={Teacher} />
        <Route path="/chats" component={ChatList} />
        <Route path="/members" component={Members} />
        <Route path="/chat/:id" component={Conversation} />
        <Route path="/convo/:id" component={Convo} />
        <Route path="/library" component={Library} />
        <Route path="/create" component={CreateNotice} />
        <Route path="/committeenotices" component={CommitteeNotices} />
        <Route path="/committeeNotice" component={CommitteeNoticeVerify} />
        <Route
          path="/createcommitteenotice"
          component={CreateCommitteeNotice}
        />
        <Route path="/createofficenotice" component={CreateOfficeNotice} />
        <Route path="/officenotices" component={OfficeNoticeList} />
        <Route path="/*" component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
