import subprocess

def render_image_handler(job):
    try:
        subprocess.run(f'node headless-three.js', shell=True, check=True)
    except subprocess.CalledProcessError as e:
        return {"error": f"Rendering process failed: {str(e)}"}
    
    return {"status": "success"}

# Serverless entry point
import runpod
runpod.serverless.start({"handler": render_image_handler})
