import React from "react";
import "./library.css";
const BookSummary = ({ item }) => {
  var returndate = new Date(item.value.due_date * 1000).toDateString();
  var issuedate = new Date(item.value.issueDate * 1000).toDateString();
  let curr = new Date();
  const date1 = new Date(item.value.due_date * 1000);
  const date2 = new Date(curr);
  const diffTime = date2 - date1;
  var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) - 1;
  if (Math.sign(diffDays) != -1) {
    if (diffDays > 7) {
      var fine = (diffDays - 7) * 4 + 14;
    } else {
      var fine = diffDays * 2;
    }
    var print = (
      <p className="center ">
        <p className="detail color darken-3 white-text">
          Return Delayed By {diffDays} Days
        </p>
        <p className="detail color darken-3 white-text">Fine: Rs.{fine}</p>
      </p>
    );
  } else {
    var print = diffDays + " Days Remaining";
  }
  return (
    <div className="row class ">
      <div className="col s12 m6">
        <div className="card ">
          <div className="card-content black-text">
           <p className="card-title til">{item.value.bookName}</p>
          </div>
          <div className="card-action">
            <p className="rounded left">
              IssueDate: <br /> {issuedate}
            </p>
            <p className="rounded right">
              Return Date: <br /> {returndate}
            </p>
            <br />
            <br />
            <br />
            <p className=" center">{print}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookSummary;
