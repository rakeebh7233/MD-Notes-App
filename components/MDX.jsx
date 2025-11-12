import Markdown from "markdown-to-jsx";
import TopNav from "./TopNav";

export default function MDX(props) {
    const { text } = props

    return (
        <section className="mdx-container">
            <TopNav {...props} />
            <article>
                <Markdown>
                    {text.trim() || 'Click Editor to create a new note'}
                </Markdown>
            </article>
        </section>
    )
}