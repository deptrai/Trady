import requests

def fetch_document_content(url: str) -> str | None:
    """
    Fetches the HTML content of a given URL.
    Tải nội dung HTML từ một URL được cung cấp.

    Args:
        url (str): The URL to fetch content from.
                   URL để tải nội dung.

    Returns:
        str | None: The HTML content as a string if successful, otherwise None.
                    Nội dung HTML dưới dạng chuỗi nếu thành công, ngược lại là None.
    """
    try:
        response = requests.get(url, timeout=10)  # Added timeout / Thêm thời gian chờ
        response.raise_for_status()  # Raise an exception for HTTP errors (4xx or 5xx) / Ném ngoại lệ cho lỗi HTTP
        return response.text
    except requests.exceptions.RequestException as e:
        print(f"Error fetching URL {url}: {e}")
        # Ghi log lỗi hoặc xử lý lỗi cụ thể hơn ở đây nếu cần
        # Log the error or handle it more specifically here if needed
        return None

if __name__ == '__main__':
    # Example usage / Ví dụ sử dụng
    test_url_valid = "https://docs.trady.so/introduction"
    test_url_invalid = "https://docs.trady.so/non-existent-page"
    
    print(f"Fetching content from: {test_url_valid}")
    content_valid = fetch_document_content(test_url_valid)
    if content_valid:
        print(f"Successfully fetched content (first 200 chars): {content_valid[:200]}...")
    else:
        print("Failed to fetch content.")

    print(f"\nFetching content from: {test_url_invalid}")
    content_invalid = fetch_document_content(test_url_invalid)
    if content_invalid:
        print(f"Successfully fetched content: {content_invalid[:200]}...")
    else:
        print("Failed to fetch content (as expected for an invalid URL).")
