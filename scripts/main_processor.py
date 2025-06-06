import os
import sys

# Add the 'scripts' directory to sys.path to allow direct imports of sibling modules
# This is useful if running this script directly or from a different context
# Thêm thư mục 'scripts' vào sys.path để cho phép import trực tiếp các module anh em
# Điều này hữu ích nếu chạy script này trực tiếp hoặc từ một ngữ cảnh khác
script_dir = os.path.dirname(os.path.abspath(__file__))
if script_dir not in sys.path:
    sys.path.append(script_dir)

try:
    from downloader import fetch_document_content
    from converter import convert_html_to_markdown
    from translator import translate_text_to_vietnamese
    from file_writer import save_markdown_to_file
except ImportError as e:
    print(f"Error importing utility modules: {e}")
    print("Please ensure that downloader.py, converter.py, translator.py, and file_writer.py are in the same directory.")
    sys.exit(1)

def process_document(doc_url: str, slug: str, project_root_path: str) -> bool:
    """
    Processes a single document: fetches, converts, saves English, translates, and saves Vietnamese.
    Xử lý một tài liệu đơn lẻ: tìm nạp, chuyển đổi, lưu tiếng Anh, dịch và lưu tiếng Việt.

    Args:
        doc_url (str): The URL of the document to process.
                       URL của tài liệu cần xử lý.
        slug (str): The slug for the document, used for filenames (e.g., "introduction" or "category/page-name").
                    Slug cho tài liệu, được sử dụng cho tên file (ví dụ: "introduction" hoặc "category/page-name").
        project_root_path (str): The absolute path to the project's root directory.
                                 Đường dẫn tuyệt đối đến thư mục gốc của dự án.

    Returns:
        bool: True if processing was successful, False otherwise.
              True nếu xử lý thành công, ngược lại là False.
    """
    print(f"Processing document: {slug} from {doc_url}")

    # 1. Fetch HTML content / Tìm nạp nội dung HTML
    print(f"  Fetching HTML from {doc_url}...")
    html_content = fetch_document_content(doc_url)
    if html_content is None:
        print(f"  Failed to fetch HTML for {slug}. Skipping.")
        return False
    print(f"  Successfully fetched HTML for {slug} (length: {len(html_content)}).")

    # 2. Convert HTML to Markdown / Chuyển đổi HTML sang Markdown
    print(f"  Converting HTML to Markdown for {slug}...")
    markdown_content_en = convert_html_to_markdown(html_content)
    if markdown_content_en is None:
        print(f"  Failed to convert HTML to Markdown for {slug}. Skipping.")
        return False
    print(f"  Successfully converted to Markdown for {slug} (length: {len(markdown_content_en)}).")

    # 3. Save English version / Lưu phiên bản tiếng Anh
    en_file_path = os.path.join(project_root_path, "docs", "User", "en", f"{slug}.md")
    print(f"  Saving English Markdown to {en_file_path}...")
    if not save_markdown_to_file(markdown_content_en, en_file_path):
        print(f"  Failed to save English Markdown for {slug}. Skipping.")
        return False
    print(f"  Successfully saved English Markdown for {slug}.")

    # Check if a valid, non-placeholder Vietnamese file already exists
    vi_file_path = os.path.join(project_root_path, "docs", "User", "vi", f"{slug}.md")
    if os.path.exists(vi_file_path):
        try:
            with open(vi_file_path, 'r', encoding='utf-8') as f_vi:
                first_line_vi = f_vi.readline().strip() # Read first line to check
            
            # Check if the first line indicates it's NOT a placeholder
            is_placeholder = first_line_vi.startswith("[CASCADE_TRANSLATION_PENDING_VI]:") or \
                             first_line_vi.startswith("[TRANSLATION_FAILED_OR_SKIPPED_FOR_SLUG]:")
            
            if not is_placeholder and first_line_vi: # Ensure not placeholder and not empty
                print(f"Vietnamese file for {slug} already exists and appears to be fully translated. Skipping Vietnamese processing step.")
                return True # Successfully processed
            else:
                print(f"Vietnamese file for {slug} exists but is a placeholder or empty. Proceeding to generate/overwrite placeholder.")
        except Exception as e:
            print(f"Error reading existing Vietnamese file {vi_file_path}: {e}. Proceeding to generate placeholder.")

    # 4. Translate Markdown to Vietnamese / Dịch Markdown sang tiếng Việt
    #    Note: In the actual workflow, Cascade will provide the translation here.
    #    Lưu ý: Trong quy trình làm việc thực tế, Cascade sẽ cung cấp bản dịch ở đây.
    print(f"  Translating Markdown to Vietnamese for {slug}...")
    markdown_content_vi = translate_text_to_vietnamese(markdown_content_en)
    if markdown_content_vi is None:
        # This might happen if the original content was empty or translator failed.
        # Điều này có thể xảy ra nếu nội dung gốc trống hoặc trình dịch không thành công.
        print(f"  Translation step returned None for {slug}. Saving as is or skipping Vietnamese version.")
        # Depending on requirements, you might want to save an empty file or skip.
        # For now, if translation is None, we'll treat it as a failure for Vietnamese part.
        # Hiện tại, nếu bản dịch là None, chúng ta sẽ coi đó là thất bại cho phần tiếng Việt.
        # However, translator.py currently returns a placeholder, so this path might not be hit
        # unless the input markdown_content_en was empty.
        # Tuy nhiên, translator.py hiện trả về một trình giữ chỗ, vì vậy đường dẫn này có thể không được thực thi
        # trừ khi markdown_content_en đầu vào trống.
        markdown_content_vi = f"[TRANSLATION_FAILED_OR_SKIPPED_FOR_SLUG]: {slug}" # Fallback content
    
    # The current translator.py returns a placeholder like "[CASCADE_TRANSLATION_PENDING_VI]: ..."
    # This is expected for now.
    print(f"  Translation placeholder generated for {slug}.")


    # 5. Save Vietnamese version / Lưu phiên bản tiếng Việt
    vi_file_path = os.path.join(project_root_path, "docs", "User", "vi", f"{slug}.md")
    print(f"  Saving Vietnamese Markdown to {vi_file_path}...")
    if not save_markdown_to_file(markdown_content_vi, vi_file_path):
        print(f"  Failed to save Vietnamese Markdown for {slug}.")
        return False # Or decide if this is a partial success
    print(f"  Successfully saved Vietnamese Markdown for {slug}.")

    print(f"Successfully processed document: {slug}")
    return True

if __name__ == '__main__':
    # Example usage: Process the first document from the PRD list
    # Ví dụ sử dụng: Xử lý tài liệu đầu tiên từ danh sách PRD
    
    # Determine project_root_path relative to this script's location
    # (scripts/main_processor.py) -> project_root is its parent directory
    # Xác định project_root_path tương đối với vị trí của script này
    # (scripts/main_processor.py) -> project_root là thư mục cha của nó
    current_script_path = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.abspath(os.path.join(current_script_path, '..'))

    print(f"Detected Project Root: {project_root}")

    # Example document: Process 'How Trady Works - Overview'
    # Tài liệu ví dụ: Xử lý tài liệu 'How Trady Works - Overview'
    sample_url = "https://docs.trady.so/how-trady-works/overview"
    sample_slug = "how-trady-works-overview"

    print(f"--- Running processing for: {sample_slug} ---")
    success = process_document(sample_url, sample_slug, project_root)
    if success:
        print(f"--- Processing for {sample_slug} COMPLETED successfully. ---")
        print(f"    English file should be at: {os.path.join(project_root, 'docs', 'User', 'en', f'{sample_slug}.md')}")
        print(f"    Vietnamese file should be at: {os.path.join(project_root, 'docs', 'User', 'vi', f'{sample_slug}.md')}")
    else:
        print(f"--- Processing for {sample_slug} FAILED. ---")

    # print(f"\n--- Running example processing for: {sample_slug_nested} ---")
    # if "sample_url_nested" in locals() and sample_url_nested: # Check if defined
    #     success_nested = process_document(sample_url_nested, sample_slug_nested, project_root)
    #     if success_nested:
    #         print(f"--- Example processing for {sample_slug_nested} COMPLETED successfully. ---")
    #     else:
    #         print(f"--- Example processing for {sample_slug_nested} FAILED. ---")
    # else:
    #     print("Nested example URL not defined, skipping.")
