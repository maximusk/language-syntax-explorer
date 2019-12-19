import exploreInit from './explore.js';

let state = {
    nodes: [],
    dictionary: [],
    renderedNodesData: new Map()
};

window.addEventListener('DOMContentLoaded', init);

function init() {
    setupEventListeners();
    exploreInit();
}

function setupEventListeners() {
    const analyzeBtn = document.querySelector('.analyze-btn');
    const pasteCodeBtn = document.querySelector('.paste-code-btn');
    const container = document.querySelector('.nodes-container');
    const input = document.querySelector('.code-input');

    analyzeBtn.addEventListener('click', submit);
    pasteCodeBtn.addEventListener('click', pasteCodeBlock);

    container.addEventListener('mouseover', (event) => {
        if (event.target.classList.contains('list-item')) {
            let node = state.renderedNodesData.get(event.target);
            input.focus();
            input.setSelectionRange(node.range[0], node.range[1]);
        }
    });
}

function pasteCodeBlock() {
    const textarea = document.querySelector('.code-input');
    textarea.value = `
        function helloWorld() {
            const condition = true;
        
            if (condition) {
                console.log('hello world');
            }
        }
    `;
}

function submit() {
    const textarea = document.querySelector('.code-input');
    const code = textarea.value;

    fetch('/parse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code})
        }
    )
        .then(response => response.json())
        .then((data) => {
            state.nodes = data.nodes;
            state.dictionary = data.dictionary;
            const normalized = normalizeNodes(state.nodes, state.dictionary);
            renderNodes(normalized);
        })
}

/***
 * interface renderedNode {
 *      type: string;
 *      description: string;
 *      docUrl: string;
 * }
 */
function normalizeNodes(nodes, dictionary) {
    return nodes.reduce((acc, node) => {
        const index = dictionary.findIndex((element) => element.astNodeType === node.type);
        if (index !== -1) {
            acc.push({...dictionary[index], range: node.range});
        }
        return acc;
    }, []);
}

function renderNodes(nodes) {
    const container = document.querySelector('.nodes-container');
    const template = document.querySelector('#ast-node');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    state.renderedNodesData = new Map();
    for (let i = 0; i < nodes.length; i++) {
        const li = document.createElement('li');
        const fragment = document.importNode(template.content, true);
        const nodeElement = fragment.firstElementChild;

        nodeElement.querySelector('.node-type').textContent = nodes[i].type;
        nodeElement.querySelector('.syntax-description').textContent = nodes[i].description;
        nodeElement.querySelector('.doc-link').href = nodes[i].docUrl;

        li.appendChild(nodeElement);
        container.appendChild(li);

        state.renderedNodesData.set(nodeElement, nodes[i]);
    }
}
