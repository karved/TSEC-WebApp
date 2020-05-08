import React from "react";
import OfficeNoticeSummary from "./OfficeNoticeSummary";
const OfficeUnverifiedNotice = ({ unverifiedNotices }) => {
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
          return <OfficeNoticeSummary item={item} key={item.noticeId} />;
        })}
    </span>
  );
};
export default OfficeUnverifiedNotice;
