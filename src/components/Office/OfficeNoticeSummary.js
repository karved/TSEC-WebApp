import React from "react";
import { Collapsible, CollapsibleItem, Badge } from "react-materialize";

const OfficeNoticeSummary = ({ item }) => {
  return (
    <div className="container">
      <div className="section">
        <Collapsible popout>
          <CollapsibleItem
            header={
              <div>
                <p>
                  {item.title} &nbsp;
                  <Badge className="red right-align lighten-1 white-text">
                    {item.sendTimestamp}
                  </Badge>
                </p>
              </div>
            }
          >
            <div>
              <p>{item.content}</p>
            </div>
          </CollapsibleItem>
        </Collapsible>
      </div>
    </div>
  );
};
export default OfficeNoticeSummary;
