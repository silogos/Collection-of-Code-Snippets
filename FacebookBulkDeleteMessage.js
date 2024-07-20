function wait(timeout = 1000) {
  return new Promise((res) => setTimeout(res, timeout));
}

function autoDeleteConversationFacebook() {
  const listChat = document.querySelector('[aria-label="Chats"]').children[0]
    .children[0].children[0];

  if (!listChat) {
    throw new Error("List chat not found");
  }

  async function deleteConversation() {
    const chats = listChat.children[1].children[0].children[0];

    chats.querySelector('[aria-label="Menu"]').click();
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
