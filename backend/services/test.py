import requests
from bs4 import BeautifulSoup


def fetch_text():
    url = "https://www.federalreserve.gov/"  # Assuming this is the main page URL
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Iterate over the li elements
    base_selector = "#content > div:nth-child(3) > div.col-xs-12.col-sm-8 > ul > li"
    li_tags = soup.select(base_selector)

    newest_press_release_link = None

    for li_tag in li_tags:
        span_tag_text = li_tag.select_one(
            'p > span').text.lower() if li_tag else ""
        if 'speech' in span_tag_text:
            # Extract the link from the matching li element
            link_tag = li_tag.find('a', href=True)
            if link_tag:
                newest_press_release_link = link_tag['href']
                break

    if not newest_press_release_link:
        raise ValueError("No 'Press Release' found!")

    base_url = 'https://www.federalreserve.gov'
    full_link = base_url + newest_press_release_link

    press_release_url = f"https://www.federalreserve.gov{newest_press_release_link}"
    response = requests.get(press_release_url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Fetch paragraphs 1-3 for the press release
    p_tags = soup.select("#article > div:nth-child(3) > p")[:3]

    press_release_content = [p.get_text() for p in p_tags]

    # if press_release_content:
    #     print(press_release_content)
    # else:
    #     print("Failed to retrieve press release content.")

    return press_release_content


fetch_text()
