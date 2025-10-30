import Options from "./Option"


function Question({ question, selectedOption, onOptionChange, onSubmit}){

    if (!question){
        <div>Loading</div>;
    }

    return (
        <div>
            {/* <h3>Question {question.id}</h3> */}

            <h5 className="mt-2">{question.question}</h5>
            <form onSubmit={onSubmit} className="mt-2 mb-2">
                <Options
                    options={question.options}
                    selectedOption={selectedOption}
                    onOptionChange={onOptionChange}
                />

                <button type="submit" className="btn btn-primary my-2">
                    SUBMIT
                </button>

            </form>

        </div>



    )


}

export default Question;