#!/bin/bash
#Usage:

#Copy the updated script into a file, e.g., flatten.sh.
#Make the script executable: chmod +x flatten.sh.
#Run the script: ./flatten.sh.
# Change this to your main directory
main_directory="/Users/espensommereide/Developer/splat/point_cloud"

# Iterate over all files in subdirectories
find "$main_directory" -mindepth 2 -type f | while read file; do
    # Skip macOS metadata files
    if [[ "$file" == ._* ]]; then
        continue
    fi
    # Extract filename and extension
    filename=$(basename "$file")
    extension="${filename##*.}"
    filename="${filename%.*}"

    # Extract subfolder name
    subfolder=$(basename "$(dirname "$file")")

    # Construct new filename with subfolder name
    new_filename="${filename}_${subfolder}.${extension}"

    # Move and rename file
    mv "$file" "$main_directory/$new_filename"
done
