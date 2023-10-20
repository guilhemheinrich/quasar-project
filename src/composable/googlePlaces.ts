// From https://www.youtube.com/watch?v=Td9SIJdR4Uo&t=229s

export default function (link: string): Promise<void> {
    return new Promise((resolve, reject) => {
        let googleScript: HTMLScriptElement | null = document.querySelector(`script[src="${link}"]`);
        console.log(link)
        if (!googleScript) {
            googleScript = document.createElement('script');
            googleScript.src = link;
            googleScript.async = true;
            document.head.append(googleScript);

            googleScript.addEventListener('error', () => {
                reject();
            })

            googleScript.addEventListener('load', () => {
                resolve();
            })
        }
    });
}