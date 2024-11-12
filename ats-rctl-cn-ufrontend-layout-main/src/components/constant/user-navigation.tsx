import { UserTypes } from "../layout";

export function getUserNavigation(user : UserTypes, activePath) {
  if (user === "applicant") {
    return getNavigationAplicant(activePath);
  } else if (user === "recruiter") {
    return getNavigationAplicant(activePath);
  } else {
    return getNavigationPublic(activePath);
  }
}

function getNavigationAplicant(activePath) {
  return [
    { name: "Your profile", href: "#" },
  ]
}

function getNavigationPublic(activePath) {
  return []
}