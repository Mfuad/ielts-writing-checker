import ScoreSkeleton from "@/components/ScoreSkeleton";
import WritingForm from "@/components/WritingForm";
import { useState } from "react";

interface IScore {
  OverallScore: Number;
  TaskAchievement: Number;
  CoherenceAndCohesion: Number;
  LexicalResource: Number;
  GrammaticalRange: Number;
}

interface IForm {
  title: string;
  text: string;
}

function MainPage() {
  const [score, setScore] = useState<IScore | null>();
  const [isLoading, setIsLoading] = useState(false);

  async function getScore(input: IForm) {
    setIsLoading(true);
    setScore(null);
    const response = await fetch("http://localhost:8000/api/score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const outputData = await response.json();
    setIsLoading(false);
    setScore(outputData);
    return outputData;
  }

  return (
    <>
      <div className="flex min-h-screen min-w-screen items-center justify-center">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl border bg-card text-card-foreground shadow p-5 flex">
            <div className="min-w-2xl max-w-2xl flex-1 pt-5">
              <WritingForm getScore={getScore}/>
            </div>

            <div className=" text-xl text-center [&>div]:p-5 [&>div]:border-dashed [&>div]:border-b-2 [&>div:last-child]:border-none  ">
              {isLoading && (
                <>
                  <ScoreSkeleton />
                  <ScoreSkeleton />
                  <ScoreSkeleton />
                  <ScoreSkeleton />
                  <ScoreSkeleton />
                </>
              )}
              {score && (
                <>
                  <div>
                    <div className="mb-2">Overall Score</div>
                    <div className="text-5xl">{`${score.OverallScore}`}</div>
                  </div>
                  <div>
                    <div className="mb-2">Task Achievement</div>
                    <div className="text-5xl">{`${score.TaskAchievement}`}</div>
                  </div>
                  <div>
                    <div className="mb-2">Coherence and Cohesion</div>
                    <div className="text-5xl">
                      {`${score.CoherenceAndCohesion}`}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2">Lexical Resource</div>
                    <div className="text-5xl">{`${score.LexicalResource}`}</div>
                  </div>
                  <div>
                    <div className="mb-2">Grammatical Range</div>
                    <div className="text-5xl">{`${score.GrammaticalRange}`}</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
