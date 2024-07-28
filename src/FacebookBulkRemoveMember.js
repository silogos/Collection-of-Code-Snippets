import tryCatch from "./utils/tryCatch.js";

async function autoRemoveMemberGroup() {
  const lists = document.querySelectorAll('[role="list"]');
  const listMember = [...lists].find((i) => {
    return i.parentElement.parentElement.innerText.includes("New to the group");
  });

  const member = listMember.querySelector('[role="listitem"');
  if (member.innerText.includes("Invited by")) {
    member.remove();
    return tryCatch({
      func: autoRemoveMemberGroup,
      delay: 1000,
      startDelay: 300,
    });
  }
  const buttonMores = member.querySelectorAll('[role="button"]');
  const buttonMore = [...buttonMores].at(-1);
  buttonMore.click();

  const moreMenuItems = await tryCatch({
    func: () => {
      const moreMenu = document.querySelector('[role="menu"]');
      const _moreMenuItems = moreMenu.querySelectorAll('[role="menuitem"]');
      if (!_moreMenuItems) {
        throw new Error("_moreMenuItems not found");
      }

      return _moreMenuItems;
    },
    maxTry: 3,
    delay: 1000,
    startDelay: 500,
  });

  const removeMemberMenu = [...moreMenuItems].find(
    (i) => i.innerText === "Remove member"
  );

  removeMemberMenu.click();

  const confirmButton = await tryCatch({
    func: () => {
      const buttons = document.querySelectorAll('[aria-label="Confirm"]');
      const _confirmButton = [...buttons].find(
        (i) => i.innerText === "Confirm"
      );
      if (!_confirmButton) throw new Error("button confirm not found");

      return _confirmButton;
    },
    maxTry: 3,
    delay: 500,
    startDelay: 500,
  });
  confirmButton.click();

  return tryCatch({
    startDelay: 500,
    func: autoRemoveMemberGroup,
    delay: 1000,
  });
}
tryCatch({
  func: autoRemoveMemberGroup,
  delay: 1000,
});
