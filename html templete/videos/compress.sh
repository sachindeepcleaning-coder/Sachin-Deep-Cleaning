#!/bin/bash

cd "$(dirname "$0")"
counter=1

# Process each mp4 file
for video in *.mp4; do
    # Skip if already compressed (cleaning-*.mp4)
    if [[ "$video" == cleaning-*.mp4 ]]; then
        continue
    fi
    
    echo "Compressing $video to cleaning-$counter.mp4..."
    
    # Compress and mute:
    # -c:v libx264: Use H.264 codec
    # -b:v 1000k: Set video bitrate to 1000k (reduces size)
    # -c:a aac: Audio codec
    # -b:a 0: No audio (mute)
    # -preset medium: Balance between speed and compression
    ffmpeg -i "$video" -c:v libx264 -b:v 1000k -preset medium -c:a aac -b:a 0 "cleaning-$counter.mp4" -y 2>/dev/null
    
    if [ $? -eq 0 ]; then
        # Delete original only if compression succeeded
        rm "$video"
        echo "✓ Compressed successfully, original deleted"
    else
        echo "✗ Failed to compress, keeping original"
    fi
    
    ((counter++))
done

echo "Compression complete! Files:"
ls -lh cleaning-*.mp4
