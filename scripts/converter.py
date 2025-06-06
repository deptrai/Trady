from markdownify import markdownify as md

def convert_html_to_markdown(html_content: str) -> str:
    """
    Converts HTML content to Markdown format.
    Chuyển đổi nội dung HTML sang định dạng Markdown.

    Args:
        html_content (str): The HTML content to convert.
                            Nội dung HTML cần chuyển đổi.

    Returns:
        str: The converted Markdown content.
             Nội dung Markdown đã được chuyển đổi.
    """
    try:
        # You can customize options for markdownify here if needed
        # Bạn có thể tùy chỉnh các tùy chọn cho markdownify ở đây nếu cần
        # Example: md(html_content, heading_style='atx', bullets='-')
        markdown_text = md(html_content)
        return markdown_text
    except Exception as e:
        print(f"Error converting HTML to Markdown: {e}")
        # Log the error or handle it more specifically here if needed
        # Ghi log lỗi hoặc xử lý lỗi cụ thể hơn ở đây nếu cần
        return "" # Return empty string or raise exception

if __name__ == '__main__':
    # Example usage / Ví dụ sử dụng
    sample_html = """
    <html>
        <head>
            <title>Test Page</title>
        </head>
        <body>
            <h1>Hello World</h1>
            <p>This is a <strong>sample</strong> paragraph with a <a href=\"https://example.com\">link</a>.</p>
            <ul>
                <li>Item 1</li>
                <li>Item 2</li>
            </ul>
            <pre><code class=\"language-python\">def greet():
    print(\"Hello from code block!\")</code></pre>
        </body>
    </html>
    """
    
    print("Original HTML (snippet):")
    print(sample_html[:200] + "...\n")
    
    markdown_output = convert_html_to_markdown(sample_html)
    
    print("Converted Markdown:")
    print(markdown_output)

    # Test with potentially problematic HTML or empty string
    print("\nTesting with empty HTML:")
    empty_html_markdown = convert_html_to_markdown("")
    print(f"Markdown for empty HTML: '{empty_html_markdown}' (expected empty or minimal)")

    print("\nTesting with None input (should ideally be handled by type hinting, but good to check):")
    try:
        # This will cause a TypeError if not handled before calling md()
        # convert_html_to_markdown(None)
        print("Test with None skipped as markdownify expects a string.")
    except Exception as e:
        print(f"Error with None input: {e}")
