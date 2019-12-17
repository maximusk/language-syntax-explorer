function pasteCodeBlock() {

}

function submit() {
    const textarea = document.querySelector('.code-input');
    const code = textarea.value;
    const range = [textarea.selectionStart, textarea.selectionEnd];

    fetch('/parse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code, range})
        }
    )
        .then(response => response.json())
        .then((data) => {
            console.log(data);
            renderNodes(data.dictionary)
        })
}

function renderNodes(nodes) {
    const container = document.querySelector('.nodes-container');
    const ul = document.createElement('ul');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    for (let i = 0; i < nodes.length; i++) {
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.textContent = `node: ${nodes[i].type}, node: ${nodes[i].docUrl}`;
        li.appendChild(div);
        ul.appendChild(li);
    }

    container.appendChild(ul);
}
