import React, { useState, useCallback, useEffect } from "react";
import {
  StyledPreviewWrapper,
  StyledPreviewContent,
  StyledQuestionTextContainer,
  StyledQuestionTextP,
  StyledOptionsContainer,
  StyledOptionWrapper,
  StyledRadioShape,
  StyledCheckboxShape,
  StyledOptionText,
  StyledInput,
  StyledTextArea,
  StyledNavigationContainer,
  StyledActionButton,
} from "./PreviewSurveys.style";
import { ElementInterface } from "../../../../types/interfaces";
import { QuestionType } from "../../../../types/enums";

const PreviewSurveys: React.FC<{
  surveyItem: ElementInterface;
  setIsShowingSurvey: React.Dispatch<React.SetStateAction<boolean>>;
  changePlayerStatus: (status: boolean) => void;
  playerControlsHeight?: number; // New prop for player controls height
}> = ({
  surveyItem,
  setIsShowingSurvey,
  changePlayerStatus,
  playerControlsHeight = 0,
}) => {
  const surveyQuestions = surveyItem.metadata.surveyQuestions || [];
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [questionId: string]: string | string[];
  }>({});

  const isLastPage =
    surveyQuestions.length > 0 && currentPage === surveyQuestions.length - 1;
  const isFirstPage = currentPage === 0;
  const currentQuestion = surveyQuestions[currentPage];
  const questionText = currentQuestion?.question_text || "Pregunta sin texto";
  const answerOptions =
    currentQuestion?.answer_options?.choices ||
    currentQuestion?.answer_options?.rows ||
    [];
  const questionType = currentQuestion?.question_type;
  const questionId = currentQuestion?.id || `question-${currentPage}`;
  const mounting = surveyItem.metadata.mounting || "center";
  const padding = 40; // Base padding for the survey content and navigation

  const shapeSize = 20;
  const shapePadding = 10;

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const [navigationHeight, setNavigationHeight] = useState(0);
  const navigationRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      setNavigationHeight(node.offsetHeight);
    }
  }, []);

  useEffect(() => {
    // This effect seems to pause the player when survey is shown
    changePlayerStatus(false);
  }, [changePlayerStatus]);

  useEffect(() => {
    const checkScreenSize = () => {
      // This is a general check, but the playerControlsHeight will be more specific
      setIsSmallScreen(window.innerHeight < 800);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleNextPage = useCallback(() => {
    if (currentPage < surveyQuestions.length - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [surveyQuestions, currentPage]);

  const handleAnswerSelection = useCallback(
    (questionId: string, answer: string, type: QuestionType) => {
      setSelectedAnswers((prev) => {
        const currentAnswers = prev[questionId];
        if (
          type === QuestionType.BOOLEAN ||
          type === QuestionType.DROPDOWN ||
          type === QuestionType.RATING
        ) {
          return { ...prev, [questionId]: answer };
        } else if (type === QuestionType.TAGBOX) {
          const newAnswers = Array.isArray(currentAnswers)
            ? currentAnswers.includes(answer)
              ? currentAnswers.filter((a) => a !== answer)
              : [...currentAnswers, answer]
            : [answer];
          return { ...prev, [questionId]: newAnswers };
        } else if (
          type === QuestionType.TEXT ||
          type === QuestionType.EMAIL ||
          type === QuestionType.PHONE ||
          type === QuestionType.DATE ||
          type === QuestionType.COMMENT
        ) {
          return { ...prev, [questionId]: answer };
        }
        return prev;
      });
    },
    [],
  );

  const handleCompleteSurvey = useCallback(() => {
    changePlayerStatus(true);
    setIsShowingSurvey(false);
  }, [selectedAnswers, changePlayerStatus, setIsShowingSurvey]);

  const isQuestionRequired = currentQuestion?.required === true;
  const currentAnswer = selectedAnswers[questionId];
  const hasAnswer =
    (typeof currentAnswer === "string" && currentAnswer.trim() !== "") ||
    (Array.isArray(currentAnswer) && currentAnswer.length > 0);
  const isNextDisabled = isQuestionRequired && !hasAnswer;

  const getParentPosition = () => {
    switch (mounting) {
      case "center":
        return {
          width: "100%",
          left: "0",
          right: "0",
          margin: "auto",
        };
      case "left":
        return {
          left: 0,
          width: "50%",
          right: "auto",
        };
      case "right":
        return {
          right: 0,
          width: "50%",
          left: "auto",
        };
      default:
        return {
          width: "100%",
          left: "0",
          right: "0",
          margin: "auto",
        };
    }
  };

  const optionsContainerBottomPadding = navigationHeight + padding + 20;

  return (
    <StyledPreviewWrapper style={{ ...getParentPosition() }}>
      <StyledPreviewContent onClick={(e) => e.stopPropagation()}>
        <StyledQuestionTextContainer>
          <StyledQuestionTextP>{questionText}</StyledQuestionTextP>
        </StyledQuestionTextContainer>
        <StyledOptionsContainer $bottomPadding={optionsContainerBottomPadding}>
          {(questionType === QuestionType.BOOLEAN ||
            questionType === QuestionType.DROPDOWN ||
            questionType === QuestionType.TAGBOX) &&
            answerOptions.map((option: string, idx: number) => {
              const isOptionSelected =
                questionType === QuestionType.BOOLEAN ||
                questionType === QuestionType.DROPDOWN ||
                questionType === QuestionType.RATING
                  ? selectedAnswers[questionId] === option
                  : Array.isArray(selectedAnswers[questionId]) &&
                    (selectedAnswers[questionId] as string[]).includes(option);
              return (
                <StyledOptionWrapper
                  key={idx}
                  onClick={() =>
                    handleAnswerSelection(questionId, option, questionType)
                  }
                >
                  {(questionType === QuestionType.BOOLEAN ||
                    questionType === QuestionType.DROPDOWN ||
                    questionType === QuestionType.RATING) && (
                    <StyledRadioShape
                      $isSelected={isOptionSelected}
                      $shapeSize={shapeSize}
                      $shapePadding={shapePadding}
                    />
                  )}
                  {questionType === QuestionType.TAGBOX && (
                    <StyledCheckboxShape
                      $isSelected={isOptionSelected}
                      $shapeSize={shapeSize}
                      $shapePadding={shapePadding}
                    />
                  )}
                  <StyledOptionText>{option}</StyledOptionText>
                </StyledOptionWrapper>
              );
            })}
          {questionType === QuestionType.RATING && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
                marginTop: "20px",
              }}
            >
              <input
                type="range"
                min="1"
                max={parseInt(
                  currentQuestion?.answer_options?.choices?.[0] || "5",
                )}
                value={parseInt((selectedAnswers[questionId] as string) || "1")}
                onChange={(e) =>
                  handleAnswerSelection(
                    questionId,
                    e.target.value,
                    questionType,
                  )
                }
                style={{
                  width: "80%",
                  accentColor: "#388083",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  marginTop: "10px",
                  color: "white",
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                }}
              >
                <span>
                  {currentQuestion?.answer_options?.min_rate_description ||
                    "Min"}
                </span>
                <span>
                  {selectedAnswers[questionId]
                    ? parseInt(selectedAnswers[questionId] as string)
                    : "1"}
                </span>
                <span>
                  {currentQuestion?.answer_options?.max_rate_description ||
                    "Max"}
                </span>
              </div>
            </div>
          )}
          {questionType === QuestionType.COMMENT ? (
            <StyledTextArea
              placeholder="Write your answer here..."
              value={(selectedAnswers[questionId] as string) || ""}
              onChange={(e) =>
                handleAnswerSelection(questionId, e.target.value, questionType)
              }
            />
          ) : (
            (questionType === QuestionType.TEXT ||
              questionType === QuestionType.EMAIL ||
              questionType === QuestionType.PHONE ||
              questionType === QuestionType.DATE) && (
              <StyledInput
                type={
                  questionType === QuestionType.EMAIL
                    ? "email"
                    : questionType === QuestionType.PHONE
                      ? "tel"
                      : questionType === QuestionType.DATE
                        ? "date"
                        : "text"
                }
                placeholder={
                  questionType === QuestionType.EMAIL
                    ? "Email"
                    : questionType === QuestionType.PHONE
                      ? "Phone number"
                      : questionType === QuestionType.DATE
                        ? "Select date"
                        : "Write your answer here..."
                }
                value={(selectedAnswers[questionId] as string) || ""}
                onChange={(e) =>
                  handleAnswerSelection(
                    questionId,
                    e.target.value,
                    questionType,
                  )
                }
              />
            )
          )}
          {questionType === QuestionType.MATRIX && (
            <div
              style={{
                display: "grid",
                gap: "12px",
                marginTop: "20px",
                fontFamily: "Montserrat",
                color: "#FFF",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `1fr repeat(${currentQuestion.answer_options?.choices?.length}, 1fr)`,
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
              >
                <div></div>
                {currentQuestion.answer_options?.choices?.map(
                  (choice: string, idx: number) => (
                    <div
                      key={idx}
                      style={{
                        textAlign: "center",
                      }}
                    >
                      {choice}
                    </div>
                  ),
                )}
              </div>
              {currentQuestion.answer_options?.rows?.map(
                (row: string, rowIdx: number) => {
                  const matrixKey = `${questionId}-${row}`;
                  const selectedChoice = selectedAnswers[matrixKey];
                  return (
                    <div
                      key={rowIdx}
                      style={{
                        display: "grid",
                        gridTemplateColumns: `1fr repeat(${currentQuestion.answer_options?.choices?.length}, 1fr)`,
                        alignItems: "center",
                        fontSize: "13px",
                      }}
                    >
                      <div
                        style={{
                          textAlign: "left",
                          paddingRight: "10px",
                        }}
                      >
                        {row}
                      </div>
                      {currentQuestion.answer_options?.choices?.map(
                        (choice: string, colIdx: number) => {
                          const isSelected = selectedChoice === choice;
                          return (
                            <div
                              key={colIdx}
                              onClick={() =>
                                handleAnswerSelection(
                                  matrixKey,
                                  choice,
                                  questionType,
                                )
                              }
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                padding: "6px",
                              }}
                            >
                              <div
                                style={{
                                  width: "16px",
                                  height: "16px",
                                  borderRadius: "50%",
                                  border: "2px solid white",
                                  backgroundColor: isSelected
                                    ? "white"
                                    : "transparent",
                                  transition: "all 0.2s ease",
                                }}
                              />
                            </div>
                          );
                        },
                      )}
                    </div>
                  );
                },
              )}
            </div>
          )}
        </StyledOptionsContainer>
        <StyledNavigationContainer
          ref={navigationRef}
          $isSmallScreen={isSmallScreen}
          $padding={padding}
          style={{
            bottom: `${playerControlsHeight > 0 ? playerControlsHeight + 10 : padding}px`,
          }}
        >
          {isLastPage ? (
            <StyledActionButton
              $isNextDisabled={false}
              $isFirstPage={isFirstPage}
              onClick={handleCompleteSurvey}
            >
              Complete
            </StyledActionButton>
          ) : (
            <StyledActionButton
              $isNextDisabled={isNextDisabled}
              $isFirstPage={isFirstPage}
              onClick={handleNextPage}
              disabled={isNextDisabled}
            >
              Next
            </StyledActionButton>
          )}
        </StyledNavigationContainer>
      </StyledPreviewContent>
    </StyledPreviewWrapper>
  );
};

export default PreviewSurveys;
