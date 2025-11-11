import Markdown from "markdown-to-jsx";
import TopNav from "./TopNav";

export default function MDX(props) {
    const { text } = props

    const md = `# This is header1
## Header 2

Hello world

[click me](https://www.google.com)
    `
    return (
        <section className="mdx-container">
            <TopNav {...props} />
            <article>
                <Markdown>
                    {text.trim()}
                </Markdown>
            </article>
        </section>
    )
}