import Markdown from "markdown-to-jsx";
import TopNav from "./TopNav";

export default function Preview(props) {
    const { text } = props

    return (
        <section className="preview-container">
            <TopNav {...props} />
            <article>
                <Markdown>
                    {text.trim() || 'Click Editor to create a new note'}
                </Markdown>
            </article>
        </section>
    )
}