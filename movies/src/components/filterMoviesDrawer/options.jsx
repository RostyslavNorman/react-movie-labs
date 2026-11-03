export const defaultFilters = {
  name: "",
  genre: "0",
  rating: 0,
  language: "all",
  sort: "none",
};

export const languages = [
  { code: "all", name: "All languages" },
  { code: "en", name: "English" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "hi", name: "Hindi" },
];

export const sortOptions = [
  { value: "none", label: "Default order" },
  { value: "ratingDesc", label: "Rating: high to low" },
  { value: "ratingAsc", label: "Rating: low to high" },
  { value: "dateDesc", label: "Newest first" },
  { value: "dateAsc", label: "Oldest first" },
  { value: "titleAsc", label: "Title A–Z" },
];