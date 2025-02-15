import { TextField,  Autocomplete, Box, CircularProgress } from "@mui/material";
import { useTags } from "../hooks/useTags";


interface TagSelectorProps {
    selectedTags: string[]
    setSelectedTags: (tags: string[]) => void
}

const TagSelector = ({ selectedTags, setSelectedTags }: TagSelectorProps) => {
  const { tags, loading, error } = useTags();


  // Handle selection of tags
  const handleSelect = (event: React.SyntheticEvent, value: (string | undefined)[]) => {
    if (value === null) {
        console.warn(event);
      console.warn("handleSelect: value is null");
      return;
    }

    setSelectedTags(
      value.filter((val) => val !== undefined && typeof val === "string") as string[]
    );
  };

  // Remove tag function if needed to show selected tags
//   const handleDelete = (tagToDelete: string) => {
//     setSelectedTags(selectedTags.filter((tag) => tag !== tagToDelete));
//   };

  // Check for errors
  if (error) {
    console.error("Error fetching tags:", error);
    return null;
  }

  // Check for loading
  if (loading) {
    return (
      <Box sx={{ width: 400, display: "flex", flexDirection: "column", gap: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  // Check if tags are available
  if (!Array.isArray(tags) || !tags.length) {
    console.warn("No tags available");
    return null;
  }

  return (
    <Box sx={{ p: 2 }} >
      {/* Autocomplete Input */}
      <Autocomplete
      //delete icon
      fullWidth
  multiple
  options={tags.map((tag) => tag.name)}
  value={selectedTags}
  onChange={handleSelect}
  getOptionLabel={(option) => option} // Add this prop
  renderInput={(params) => <TextField {...params} label="Search Tags" variant="outlined" />}
/>
      {/* Selected Tags as Chips
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 , p: 1 }}>
        {selectedTags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            onDelete={() => handleDelete(tag)}
            deleteIcon={<CloseIcon />}
            color="primary"           
          />
        ))}
      </Box> */}
    </Box>
  );
};

export default TagSelector;
