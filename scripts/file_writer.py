import os

def save_markdown_to_file(content: str, file_path: str) -> bool:
    """
    Saves the given Markdown content to a specified file path.
    Lưu nội dung Markdown được cung cấp vào một đường dẫn file cụ thể.

    Args:
        content (str): The Markdown content to save.
                       Nội dung Markdown cần lưu.
        file_path (str): The full path to the file where content will be saved.
                         Đường dẫn đầy đủ đến file nơi nội dung sẽ được lưu.

    Returns:
        bool: True if saving was successful, False otherwise.
              True nếu lưu thành công, ngược lại là False.
    """
    try:
        # Ensure the directory exists before writing the file
        # Đảm bảo thư mục tồn tại trước khi ghi file
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        # print(f"Successfully saved content to {file_path}") # Optional: for verbose logging
        return True
    except IOError as e:
        print(f"Error saving file {file_path}: {e}")
        # Log the error or handle it more specifically here if needed
        # Ghi log lỗi hoặc xử lý lỗi cụ thể hơn ở đây nếu cần
        return False
    except Exception as e:
        print(f"An unexpected error occurred while saving {file_path}: {e}")
        return False

if __name__ == '__main__':
    # Example usage / Ví dụ sử dụng
    sample_md_content_en = """
# Introduction to Chain Lens

Chain Lens is a revolutionary platform for decentralized trading.
This document provides an overview.
"""
    sample_md_content_vi = """
# Giới thiệu về Chain Lens

Chain Lens là một nền tảng mang tính cách mạng cho giao dịch phi tập trung.
Tài liệu này cung cấp một cái nhìn tổng quan.
"""
    
    # Define base path for test files (e.g., in a temporary test directory)
    # For this example, we'll use a 'test_output' directory relative to this script
    # Trong ví dụ này, chúng ta sẽ sử dụng thư mục 'test_output' tương đối với script này
    script_dir = os.path.dirname(__file__)
    test_output_dir_en = os.path.join(script_dir, '..', 'docs', 'User', 'en', 'test_output') # Relative to project root
    test_output_dir_vi = os.path.join(script_dir, '..', 'docs', 'User', 'vi', 'test_output') # Relative to project root

    # Corrected paths to be within the project structure as per task
    # These paths assume the script is run from the project root or paths are adjusted accordingly
    # For the purpose of this __main__ block, let's assume we are creating test files
    # in a temporary location or relative to where the script is.
    # If scripts/file_writer.py, then ../docs/User/en is correct relative to project root.
    
    # Let's use paths relative to the project root for clarity in example
    # Assuming project root is /Users/mac_1/Documents/GitHub/Untitled/Chain Lens
    project_root = os.path.abspath(os.path.join(script_dir, '..')) 
    
    test_file_en_path = os.path.join(project_root, "docs", "User", "en", "example_en.md")
    test_file_vi_path = os.path.join(project_root, "docs", "User", "vi", "example_vi.md")
    
    print(f"Attempting to save English example to: {test_file_en_path}")
    if save_markdown_to_file(sample_md_content_en, test_file_en_path):
        print("English example saved successfully.")
        # You can verify by checking the file content
        with open(test_file_en_path, 'r', encoding='utf-8') as f_read:
            print(f"Content of {os.path.basename(test_file_en_path)}:\n{f_read.read()}")
    else:
        print("Failed to save English example.")

    print(f"\nAttempting to save Vietnamese example to: {test_file_vi_path}")
    if save_markdown_to_file(sample_md_content_vi, test_file_vi_path):
        print("Vietnamese example saved successfully.")
        with open(test_file_vi_path, 'r', encoding='utf-8') as f_read:
            print(f"Content of {os.path.basename(test_file_vi_path)}:\n{f_read.read()}")
    else:
        print("Failed to save Vietnamese example.")

    # Test saving to a non-existent nested directory (os.makedirs should handle this)
    test_nested_path = os.path.join(project_root, "docs", "User", "en", "nested_dir", "nested_example.md")
    print(f"\nAttempting to save to nested directory: {test_nested_path}")
    if save_markdown_to_file("Nested test content.", test_nested_path):
        print("Nested example saved successfully.")
    else:
        print("Failed to save nested example.")
