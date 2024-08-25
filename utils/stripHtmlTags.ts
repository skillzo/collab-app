export function stripHtmlTags(inputString: string) {
  const doc = new DOMParser().parseFromString(inputString, "text/html");
  return doc.body.textContent || "";
}
