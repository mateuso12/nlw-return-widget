import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackReturnRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackReturnRequested,
  onFeedbackSent
}: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    setIsSendingFeedback(true)

    await api.post("/feedbacks", {
      type: feedbackType,
      comment,
      screenshot
    })
    setIsSendingFeedback(false)
    onFeedbackSent()
  }

  return (
    <>
      <header>

        <button
          className="top-5 left-5 absolute text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100"
          onClick={onFeedbackReturnRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>

      <form className="my-4 w-full" onSubmit={handleSubmitFeedback}>
        <textarea
          className="min-w-[304px] w-full min-h-[112px] text-sm dark:placeholder-zinc-400 dark:text-zinc-100 dark:border-zinc-100 bg-transparent rounded-md focus:border-red-500 focus:ring-red-500 focus:ring-1 focus:outline-none resize-none scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="Algo não esta funcionando bem?Queremos corrigir.Conte com detalhes o que está acontecendo..."
          onChange={event => setComment(event.target.value)}
        />

        <footer className="flex gap-2 mt-2">

          <ScreenshotButton
            screenshot={screenshot}
            onScreenshotTook={setScreenshot}
          />

          <button
            type="submit"
            disabled={!comment.length || isSendingFeedback}
            className="p-2 bg-red-500 rounded-md border-transparent text-zinc-100 flex-1 flex justify-center items-center text-sm hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-red-500 transition-colors disabled:opacity-50 disabled:hover:bg-red-500"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}