import { IJob } from "../../contexts/types";
import { forwardRef } from "react";
import "./Card.css";

interface CardProps {
  job: IJob;
  toggleActive: (tag: string) => void;
  activeTags: string[];
  ref?: React.Ref<HTMLDivElement>;
}

const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { job, toggleActive, activeTags } = props;
  return (
    <>
      <div ref={ref} className={`card ${job.featured ? "featured" : ""}`}>
        <div className="centerlized">
          <div className="left-card-container">
            <img src={`/static-job-listings/${job.logo}`} alt="logo" />
            <div className="company-content">
              <div className="top-card-container">
                <span>{job.company}</span>
                <div className="tag-container">
                  {job.new && (
                    <div className="rounded-tag new">
                      <span>New!</span>
                    </div>
                  )}
                  {job.featured && (
                    <div className="rounded-tag featured">
                      <span>featured</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="middle-card-container">
                <a href="#">{job.position}</a>
              </div>
              <div className="bottom-card-container">
                <span className="postedAt">{job.postedAt}</span>
                <span className="dot"></span>
                <span className="contract">{job.contract}</span>
                <span className="dot"></span>
                <span className="location">{job.location}</span>
              </div>
            </div>
          </div>
          <div className="right-card-container">
            {job.languages.map((language: string, index: number) => (
              <div
                key={index}
                onClick={() => toggleActive(language)}
                className={`job-tag ${
                  activeTags.includes(language) ? "active" : ""
                }`}
              >
                <div className="job-tag-inner role">
                  <span>{language}</span>
                </div>
              </div>
            ))}
            {job.tools.map((tool: string, index: number) => (
              <div
                key={index}
                onClick={() => toggleActive(tool)}
                className={`job-tag ${
                  activeTags.includes(tool) ? "active" : ""
                }`}
              >
                <div className="job-tag-inner role">
                  <span>{tool}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
});

export default Card;
