export const formatGraphContent = graphContent => ({
    id: graphContent.id || null,
    html: graphContent.html || null,
    ...graphContent.frontmatter,
});

export const formatTalkWithSpeakers = (talk, speakers = []) => ({
    ...formatGraphContent(talk),
    speakers: talk.frontmatter.speakers
        .map(speaker => {
            const findedSpeaker = speakers.find(
                sp => sp.node.frontmatter.slug === speaker,
            );
            if (findedSpeaker) {
                return formatGraphContent(findedSpeaker.node);
            } else {
                return null;
            }
        })
        .filter(sp => sp !== null),
});

export const formatDojoWithCraftsmen = (dojo, craftsmen = []) => ({
    ...formatGraphContent(dojo),
    craftsmen: dojo.frontmatter.craftsmen
        .map(craftsman => {
            const findedCraftsman = craftsmen.find(
                sp => sp.node.frontmatter.slug === craftsman,
            );
            if (findedCraftsman) {
                return formatGraphContent(findedCraftsman.node);
            } else {
                return null;
            }
        })
        .filter(cm => cm !== null),
});

export const formatSpeakerWithTalksAndDojos = (
    speaker,
    talks = [],
    dojos = [],
) => ({
    ...formatGraphContent(speaker),
    talks: talks
        .map(talk => formatGraphContent(talk.node))
        .filter(talk =>
            talk.speakers.find(sp => sp === speaker.frontmatter.slug),
        ),
    dojos: dojos
        .map(dojo => formatGraphContent(dojo.node))
        .filter(dojo =>
            dojo.craftsmen.find(
                craftsman => craftsman === speaker.frontmatter.slug,
            ),
        ),
});

export const formatMeetup = rawMeetup => {
    let meetup = null;

    if (rawMeetup === null) {
        return meetup;
    }

    rawMeetup.edges.map(edge => {
        meetup = edge.node;
    });

    return meetup;
};
