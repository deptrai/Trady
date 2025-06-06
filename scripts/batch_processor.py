import os
import sys
import time

# Add the 'scripts' directory to sys.path to allow direct imports of sibling modules
script_dir = os.path.dirname(os.path.abspath(__file__))
if script_dir not in sys.path:
    sys.path.append(script_dir)

try:
    from main_processor import process_document
except ImportError as e:
    print(f"Error importing 'process_document' from 'main_processor.py': {e}")
    print("Please ensure that main_processor.py is in the same directory or accessible via PYTHONPATH.")
    sys.exit(1)

# List of documents to process (based on the initial 20 from PRD)
# Danh sách tài liệu cần xử lý (dựa trên 20 tài liệu ban đầu từ PRD)
DOCUMENTS_TO_PROCESS = [
    {"url": "https://docs.trady.so/introduction", "slug": "introduction"},
    {"url": "https://docs.trady.so/getting-started", "slug": "getting-started"},
    {"url": "https://docs.trady.so/how-trady-works", "slug": "how-trady-works"},
    {"url": "https://docs.trady.so/key-features", "slug": "key-features"},
    {"url": "https://docs.trady.so/user-guides", "slug": "user-guides"},
    {"url": "https://docs.trady.so/user-guides/account-setup", "slug": "user-guides/account-setup"},
    {"url": "https://docs.trady.so/user-guides/wallet-management", "slug": "user-guides/wallet-management"},
    {"url": "https://docs.trady.so/user-guides/copy-trading", "slug": "user-guides/copy-trading"},
    {"url": "https://docs.trady.so/user-guides/manual-trading", "slug": "user-guides/manual-trading"},
    {"url": "https://docs.trady.so/user-guides/understanding-analytics", "slug": "user-guides/understanding-analytics"},
    {"url": "https://docs.trady.so/developer-docs", "slug": "developer-docs"},
    {"url": "https://docs.trady.so/developer-docs/api-reference", "slug": "developer-docs/api-reference"},
    {"url": "https://docs.trady.so/developer-docs/sdk-integration", "slug": "developer-docs/sdk-integration"},
    {"url": "https://docs.trady.so/support", "slug": "support"},
    {"url": "https://docs.trady.so/support/faq", "slug": "support/faq"},
    {"url": "https://docs.trady.so/support/troubleshooting", "slug": "support/troubleshooting"},
    {"url": "https://docs.trady.so/legal", "slug": "legal"},
    {"url": "https://docs.trady.so/legal/terms-of-service", "slug": "legal/terms-of-service"},
    {"url": "https://docs.trady.so/legal/privacy-policy", "slug": "legal/privacy-policy"},
    {"url": "https://docs.trady.so/contact-us", "slug": "contact-us"}
]

def process_all_documents(project_root_path: str):
    """
    Processes all documents defined in DOCUMENTS_TO_PROCESS.
    Xử lý tất cả các tài liệu được định nghĩa trong DOCUMENTS_TO_PROCESS.

    Args:
        project_root_path (str): The absolute path to the project's root directory.
                                 Đường dẫn tuyệt đối đến thư mục gốc của dự án.
    """
    total_documents = len(DOCUMENTS_TO_PROCESS)
    successful_processing = 0
    failed_processing = 0
    start_time = time.time()

    print(f"Starting batch processing for {total_documents} documents...")

    for i, doc_info in enumerate(DOCUMENTS_TO_PROCESS):
        url = doc_info["url"]
        slug = doc_info["slug"]
        
        print(f"\n--- Processing document {i+1}/{total_documents}: {slug} ---")
        print(f"URL: {url}")
        
        try:
            if process_document(url, slug, project_root_path):
                print(f"--- Successfully processed {slug} ---")
                successful_processing += 1
            else:
                print(f"--- Failed to process {slug} (process_document returned False) ---")
                failed_processing += 1
        except Exception as e:
            print(f"--- CRITICAL ERROR while processing {slug}: {e} ---")
            failed_processing += 1
        
        # Optional: Add a small delay to avoid overwhelming the server
        # Tùy chọn: Thêm một độ trễ nhỏ để tránh làm quá tải máy chủ
        # time.sleep(1) 

    end_time = time.time()
    total_time = end_time - start_time

    print(f"\n--- Batch Processing Summary ---")
    print(f"Total documents attempted: {total_documents}")
    print(f"Successfully processed: {successful_processing}")
    print(f"Failed to process: {failed_processing}")
    print(f"Total processing time: {total_time:.2f} seconds")
    print("--- Batch Processing Finished ---")

if __name__ == '__main__':
    # Determine project_root_path relative to this script's location
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(current_script_path, '..'))

    print(f"Detected Project Root for Batch Processing: {project_root}")
    
    process_all_documents(project_root)
