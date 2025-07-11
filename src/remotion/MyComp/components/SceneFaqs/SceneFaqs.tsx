import { useEffect, useState } from "react";
import Icon from "./../icons/icons";
import { Faq } from "../../../../types/interfaces";
import { CustomPaper, IconFaqContainer, TitleSeeAll } from "./SceneFaqs.style";
import {
  ClickAwayListener,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { SceneFaqsProps } from "./SceneFaqs.types";

const SceneFaqs = ({
  currentScenId,
  sceneIndex,
  isInRemotion,
  changePlayerStatus,
  faqs,
}: SceneFaqsProps) => {
  const [isShowAll, setIsShowAll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);
  const closeModal = () => setIsOpen(false);

  useEffect(() => {
    if (changePlayerStatus) {
      changePlayerStatus(isOpen, "faqs");
    }
  }, [isOpen]);

  const renderFaqs = ({ faq, index }: { faq: Faq; index: number }) => {
    return (
      <Accordion
        key={index}
        sx={{
          boxShadow: "none",
          "&::before": { display: "none" },
          "&.Mui-expanded": { margin: "5px 0 !important" },
        }}
      >
        <AccordionSummary
          sx={{
            marginBottom: "10px",
            backgroundColor: "#ECF6F7",
            borderRadius: "5px",
            minHeight: "34px",
            "&.Mui-expanded": { minHeight: "34px" },
            "& .MuiAccordionSummary-content": {
              margin: "0px",
              "&.Mui-expanded": { margin: "0px" },
            },
          }}
        >
          <Typography
            sx={{
              fontSize: "10px",
              color: "#2B3948",
              fontFamily: "Montserrat",
            }}
            fontWeight="600"
          >
            {faq.question}
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            backgroundColor: "#ECF6F7",
            borderRadius: "5px",
            minHeight: "34px",
            marginBottom: "5px",
          }}
        >
          <Typography
            sx={{
              fontSize: "10px",
              color: "#2B3948",
              fontFamily: "Montserrat",
            }}
            fontWeight="500"
          >
            {faq.answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  };

  const returnContentFaqs = () => {
    return (
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconFaqContainer
          style={{ width: "48px", height: "48px" }}
          aria-label="icon-faq"
          onClick={toggleModal}
        >
          <Icon width="48px" height="48px" type="interrogation_circle" />
        </IconFaqContainer>

        {isOpen && (
          <ClickAwayListener onClickAway={closeModal}>
            <CustomPaper
              elevation={3}
              sx={{
                position: "absolute",
                right: 60,
                top: 20,
                width: 216,
                backgroundColor: "white",
                borderRadius: "4px",
                boxShadow: 3,
                padding: 2,
                zIndex: 100,
                maxHeight: "300px",
                overflow: "auto",
              }}
            >
              <TitleSeeAll>
                {isShowAll && (
                  <div
                    aria-label="go-back-faqs"
                    style={{ cursor: "pointer" }}
                    onClick={() => setIsShowAll(false)}
                  >
                    <Icon width="10px" height="10px" type="arrow_left_back" />
                  </div>
                )}
                <div
                  aria-label="see-all-faqs"
                  style={{ cursor: "pointer" }}
                  onClick={() => setIsShowAll(true)}
                >
                  See all
                </div>
              </TitleSeeAll>
              {isShowAll
                ? faqs.map((faq, index) => renderFaqs({ faq, index }))
                : faqs.map((faq, index) => {
                    if (faq.scene === currentScenId?.toString()) {
                      return renderFaqs({ faq, index });
                    }
                  })}
            </CustomPaper>
          </ClickAwayListener>
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
      }}
    >
      {returnContentFaqs()}
    </div>
  );
};

export default SceneFaqs;
