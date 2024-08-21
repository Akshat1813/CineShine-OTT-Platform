export const formatReleaseDate = (date) => {
    if (!date) return "No release date available";
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};