import React from "react";
import UnverifiedNoticeSummary from "./UnverifiedNoticeSummary";
const CommitteeUnverifiedNotice = ({ unverifiedNotices }) => {
  var unverifiedNoticesArr = [];
  unverifiedNotices &&
    Object.keys(unverifiedNotices).forEach(function(key) {
      var value = unverifiedNotices[key];
      unverifiedNoticesArr.push(value);
    });
  return (
    <span>
      {unverifiedNoticesArr &&
        unverifiedNoticesArr.map(item => {
          return <UnverifiedNoticeSummary item={item} key={item.noticeId} />;
        })}
    </span>
  );
};
export default CommitteeUnverifiedNotice;
