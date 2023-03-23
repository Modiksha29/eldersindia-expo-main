import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from "react-native";
import { Icon } from "@ui-kitten/components";
import { MotiView } from "moti";

const CustomTagInput = ({ onTagsChange, name,onReset }) => {
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const regex = /^[a-zA-Z]+([a-zA-Z0-9]*[_-]?[a-zA-Z0-9]+)*$/;

  const handleAddTag = () => {
    const rawTag = tagInput
      .split(",")[0]?.trim();
    if (rawTag.length === 0) {
      alert("Tag input cannot be empty.");
      return;
    }
    // if (!rawTag.match(regex)) {
    //   alert("Invalid tag input.");
    //   return;
    // }
    const newTag = {
      id: `${rawTag}-${Date.now()}-${rawTag.trim()}`, // add the id to the tag object
      name: rawTag.trim(),
    }
    setTags([...tags, newTag]);
    setTagInput("");
    onTagsChange([...tags, newTag]);
  };

  const handleRemoveTag = (tagId) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
    onTagsChange(tags.filter((tag) => tag.id !== tagId));
  };

  useEffect(() => {
    if (tagInput.includes(',')) {
      handleAddTag();
    }
  }, [tagInput])


  return (
    <MotiView>

      <MotiView style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={tagInput}
          onChangeText={setTagInput}
          onSubmitEditing={handleAddTag}
          placeholder="Add tag"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTag}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </MotiView>
      <MotiView style={styles.tagListContainer}>
        {tags.map((tag) => (
          <MotiView key={tag.id} style={styles.tagContainer}>
            <Text style={styles.tag}>{tag.name}</Text>
            <TouchableOpacity onPress={() => handleRemoveTag(tag.id)}>
              <Icon
                name="close-circle-outline"
                fill="#9B9B9B"
                style={styles.closeIcon}
              />
            </TouchableOpacity>
          </MotiView>
        ))}
      </MotiView>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  tagInputContainer: {
    padding: 10,
  },
  tagListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    marginTop: 8,
  },
  tagContainer: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  tag: {
    marginRight: 5,
  },
  closeIcon: {
    width: 16,
    height: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7F9FC",
    borderRadius: 4,
    height: 40,
    borderColor: "#C5CEE0"
  },
  input: {
    flex: 1,
    padding: 5,
    fontSize: 16,
    marginRight: 5,
  },
  addButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 5,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomTagInput;
