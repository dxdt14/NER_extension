from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
import json
from django.contrib.auth.models import User #####
from django.http import JsonResponse , HttpResponse ####

import wikipedia
from flair.data import Sentence
from flair.models import SequenceTagger
from segtok.segmenter import split_single

tagger = SequenceTagger.load("flair/ner-english-large")

def index(request):
    return HttpResponse("Hello, world. You're at the wiki index.")


# https://pypi.org/project/wikipedia/#description
def get_wiki_summary(request):
    topic = request.GET.get('topic', None)
    #topic = request.POST
    print('topic:', topic)
    sentences = [Sentence(x, use_tokenizer=True) for x in split_single(topic)]
    #sentence = Sentence(topic)
    tagger.predict(sentences)

    # labels = ""
    # for ent in sentence.get_labels():
    #     labels += ent.value + ", "

    entities = []

    for i in range(len(sentences)):
        for entity in sentences[i].get_spans('ner'):
            entities.append(sentences[i].to_original_text()[entity.start_position:entity.end_position])

    data = {
        'summary': entities,
        'raw': 'Successful',
    }

    print('json-data to be sent: ', data)

    return JsonResponse(data)