export default function autoInviteFacebook() {
  const titleModalInvite = "Invite followers to this group"; // This depend on your language at facebook

  let countTry = 0;
  const modalElm = document.querySelector(
    `[role="dialog"][aria-label="${titleModalInvite}"]`
  );

  if (!modalElm) {
    throw new Error("Modal invite not found");
  }

  function selectCheckBox() {
    const checkBoxs = modalElm.querySelectorAll('[role="checkbox"]');
    const checkBoxsUnchecked = [...checkBoxs].filter(
      (e) => e.ariaChecked === "false" && e.tabIndex === 0
    );

    if (checkBoxsUnchecked.length === 0) {
      if (countTry > 3) return false;
      countTry += 1;
      setTimeout(selectCheckBox, 1500);
    }

    countTry = 0;

    checkBoxs.item(checkBoxs.length - 1).scrollIntoView();
    checkBoxsUnchecked[0].click();

    setTimeout(selectCheckBox, Math.random() * 300);
  }

  selectCheckBox();
}

autoInviteFacebook();
