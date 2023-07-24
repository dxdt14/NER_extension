from django.shortcuts import render
from bs4 import BeautifulSoup
# Create your views here.
import requests
from django.shortcuts import render
import json
from django.contrib.auth.models import User #####
from django.http import JsonResponse , HttpResponse ####
from django.views.decorators.csrf import csrf_exempt

import wikipedia
from flair.data import Sentence
from flair.models import SequenceTagger
from segtok.segmenter import split_single

tagger = SequenceTagger.load("flair/ner-english-large")

def index(request):
    return HttpResponse("Hello, world. You're at the wiki index.")

@csrf_exempt
# https://pypi.org/project/wikipedia/#description
def get_ner(request):
    topic = request.GET.get("data")
    # response = requests.get(topic)
    # soup = BeautifulSoup(response.text, "lxml")
    # text = soup.find("body").text
    print('data:', topic)
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

def is_ajax(request):
    return request.META.get('HTTP_X_REQUESTED_WITH') == 'XMLHttpRequest'