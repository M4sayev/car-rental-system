from typing import Optional
from fastapi import UploadFile

import shutil
import uuid

def save_image(image_url: UploadFile) -> Optional[str]:
    # save image if provided
    image_path = None
    if image_url:
        filename = f"cars/{uuid.uuid4()}_{image_url.filename}"
        filepath = f"media/{filename}"
        with open(filepath, "wb") as f:
            shutil.copyfileobj(image_url.file, f)
        image_path =  f"/media/{filename}"
    return image_path