import React, { useContext, useState } from "react";
import "./StateCard.css";
import { useHistory } from "react-router";
import { AppContext } from "../../Contexts/AppContext";

export const DisplayCount = (props) => {
  return (
    <h4
      className="cardSummary__container"
      style={{ color: props.color, textShadow: "1px 1px 2px #494949" }}
    >
      {`${props.subHeading} : `}
      <span
        className="cardSummary_cnt"
        style={{ color: props.color, textShadow: "1px 1px 2px #494949" }}
      >
        {props?.cnt ?? 0}
      </span>
    </h4>
  );
};
const CardSummary = (props) => {
  return (
    <div className="stateCard__container">
      <h3 className="summary__heading">
        <i>{props?.heading}</i>
      </h3>
      <div>
        <DisplayCount
          subHeading="Confirmed"
          color="#caca28"
          cnt={props?.confirmed}
        />
        <DisplayCount
          subHeading="Recovered"
          color="#068206"
          cnt={props?.recovered}
        />
        <DisplayCount
          subHeading="Deceased"
          color="#ff0000"
          cnt={props?.deceased}
        />
      </div>
    </div>
  );
};

export const defaultData = {
  confirmed: 0,
  deceased: 0,
  recovered: 0,
};

function StateCard(props) {
  const history = useHistory();
  const { setIsDistrictSelected, isDistrictSelected } = useContext(AppContext);
  const [cardNav, setCardNav] = useState(0);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const showDetailedView = () => {
    history.push({
      pathname: "/detailed",
      state: props,
    });
  };
  const stateImage = require(`../../Images/${
    props.stateCode ?? "GENERAL"
  }.jpg`);
  return (
    <div className="state__container">
      <img src={stateImage} alt="" />
      <div>
        <div className="stateCard_MainContainer">
          <h3>{props.stateName ?? props.stateCode}</h3>
          {props.details?.districts && (
            <select
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                if (e.target.value) {
                  setIsDistrictSelected(true);
                } else {
                  setIsDistrictSelected(false);
                }
              }}
            >
              <option value="">Select a District</option>
              {Object.keys(props.details?.districts).map((district, idx) => (
                <option value={district} key={idx}>
                  {district}
                </option>
              ))}
            </select>
          )}
        </div>
        {!selectedDistrict ? (
          <div onClick={showDetailedView}>
            {cardNav === 0 && (
              <CardSummary
                heading="Total"
                {...(props?.details?.total ?? defaultData)}
              />
            )}
            {cardNav === 1 && (
              <CardSummary
                heading="Delta"
                {...(props?.details?.delta ?? defaultData)}
              />
            )}
            {cardNav === 2 && (
              <CardSummary
                heading="Delta 7"
                {...(props?.details?.delta7 ?? defaultData)}
              />
            )}
          </div>
        ) : (
          <>
            {cardNav === 0 && (
              <CardSummary
                heading="Total"
                {...(props?.details?.districts[selectedDistrict]?.total ??
                  defaultData)}
              />
            )}
            {cardNav === 1 && (
              <CardSummary
                heading="Delta"
                {...(props?.details?.districts[selectedDistrict]?.delta ??
                  defaultData)}
              />
            )}
            {cardNav === 2 && (
              <CardSummary
                heading="Delta 7"
                {...(props?.details?.districts[selectedDistrict]?.delta7 ??
                  defaultData)}
              />
            )}
          </>
        )}
      </div>
      {cardNav !== 0 && (
        <span
          onClick={() => setCardNav(cardNav - 1)}
          className="StateCard__Nav StateCard__LessThan"
        >
          &#60;
        </span>
      )}
      {cardNav !== 2 && (
        <span
          onClick={() => setCardNav(cardNav + 1)}
          className="StateCard__Nav StateCard__GreaterThan"
        >
          &#62;
        </span>
      )}
    </div>
  );
}

export default StateCard;
