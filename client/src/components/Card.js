import React from "react";
import { Link } from "react-router-dom";
import auth from "../services/auth";

const Card = props => {
  return (
    <div className="col-md-4">
      <div className="card mb-4 box-shadow">
        <img
          className="card-img-top"
          data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
          alt="Thumbnail [100%x225]"
          style={{ width: "100%", display: "block" }}
          src={props.imgPath}
          data-holder-rendered="true"
        />
        <div className="card-body">
          <h2 className="card-text">{props.name}</h2>
          <h3 className="card-text">Brand: {props.brand}</h3>
          <h3 className="card-text">ISO: {props.iso}</h3>

          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
              >
                View
              </button>
              <Link
                className="btn btn-sm btn-outline-secondary"
                to={{
                  pathname: "/edit",
                  filmProps: {
                    name: props.name,
                    brand: props.brand,
                    ISO: props.iso,
                    id: props.id,
                    img_path: props.imgPath
                  }
                }}
              >
                Edit
              </Link>
              {auth.isAuthenticated() ? (
                <button
                  onClick={props.onClick}
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                >
                  Delete
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
