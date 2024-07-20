function wait(timeout = 1000) {
  return new Promise((res) => setTimeout(res, timeout));
}

function autoDeleteConversationFacebook() {
  const listChat = document.querySelector('[aria-label="Chats"]').children[0]
    .children[0].children[0];

  if (!listChat) {
    throw new Error("List chat not found");
  }

  let countTry = 0;
  async function deleteConversation() {
    const firstChat = listChat.children[1].children[0].children[0];

    if (!firstChat) {
      if (checkBoxsUnchecked.length === 0) {
        if (countTry > 3) return false;
        countTry += 1;
        await wait(1500);
        deleteConversation();
      }

      countTry = 0;
    }

    firstChat.querySelector('[aria-label="Menu"]').click();
    await wait();
    const menuItemDelete = document.querySelectorAll('[role="menuitem"]')[7];
    // console.log({ menuItemDelete });
    menuItemDelete.click();
    await wait();
    const buttonConfirmDelete = document.querySelectorAll(
      '[aria-label="Delete chat"][role="button"]'
    )[1];
    // console.log({ buttonConfirmDelete });
    buttonConfirmDelete.click();

    await wait();
    deleteConversation();
  }

  deleteConversation();
}
