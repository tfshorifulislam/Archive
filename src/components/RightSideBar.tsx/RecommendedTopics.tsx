const RecommendedTopics = () => {
    const topics = [
        "Technology",
        "Life",
        "Career",
        "Personal Growth",
        "Productivity",
        "Travel",
        "Books",
        "Ideas",
    ];

    return (
        <aside className="sticky top-24">
            <div className="rounded-2xl border bg-background p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Explore
                </p>

                <h2 className="mt-2 text-xl font-semibold tracking-tight">
                    Recommended topics
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    A mix of ideas, experiences, knowledge, and stories
                    from different parts of life.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {topics.map((topic) => (
                        <span
                            key={topic}
                            className="rounded-full border bg-muted/40 px-3 py-1.5 text-xs font-medium text-foreground"
                        >
                            {topic}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-6 border-t pt-5">
                <p className="text-xs leading-5 text-muted-foreground">
                    Read something new. Discover different perspectives.
                    Share what you know.
                </p>
            </div>
        </aside>
    );
};

export default RecommendedTopics;